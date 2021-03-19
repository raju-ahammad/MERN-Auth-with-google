const jobPostController = require('../jobPost/controller');
const auth = require('../middleware/auth')
const router = require('express').Router();



router.post('/jobpost', auth, jobPostController.jobPost)
router.get('/', jobPostController.getAllJob)
router.get('/:jobId', jobPostController.getjob)
router.put('/update/:jobId', auth, jobPostController.updateJob)
router.delete('/delete/:jobId', auth, jobPostController.deleteJob)

module.exports = router;