import { Router } from 'express'
import { getStatistics } from './statistics.controllers'

const router = Router()

router.get('/:userId', getStatistics)

export default router
