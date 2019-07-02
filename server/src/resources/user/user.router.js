import { Router } from 'express'
import { me, updateMe, getAllUsers, getUsers } from './user.controllers'

const router = Router()

router.get('/', getAllUsers)
router.get('/me', me)
router.put('/', updateMe)
router.get('/:userId', getUsers)

export default router
