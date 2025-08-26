import Joi from 'joi'

const emailSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
})
export const validateEmail = (email: string) => {
	const { error } = emailSchema.validate({ email })
	return error ? error.details[0].message : undefined
}

const passwordSchema = Joi.object({
	password: Joi.string()
		.pattern(new RegExp('^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$'))
		.required()
		.messages({
			'string.pattern.base':
				'Password must be at least 8 characters long and contain at least one special character.'
		})
})

export const validatePassword = (password: string) => {
	const { error } = passwordSchema.validate({ password })
	return error ? error.details[0].message : undefined
}
