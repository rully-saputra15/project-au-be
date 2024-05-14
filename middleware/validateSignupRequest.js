import { body, validationResult } from 'express-validator';
import SupabaseClient from '../services/supabase';

const validateSignupRequest = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    body('oauth_token').notEmpty().withMessage('Token is required'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors.array(),
            });
        }
        
        const { email } = req.body;
        const { data } = await SupabaseClient.from('User')
            .select('*=')
            .eq('email', email);
        if (data.length !== 0) {
            return res.status(409).json({
                success: false,
                message: 'Email already exists',
                statusCode: 409,
            });
        }

        return next();
    },
];

export default validateSignupRequest;
