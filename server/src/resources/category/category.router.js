import { Router } from 'express'
import { getAllCategory } from './category.controllers'

const router = Router()

router.get('/', getAllCategory)

export default router
