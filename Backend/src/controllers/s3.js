// Author: Purvilkumar Bharthania (B00901605)

const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } = require("../config");

const bucketName = AWS_BUCKET_NAME
const region = AWS_BUCKET_REGION
const accessKeyId = AWS_ACCESS_KEY
const secretAccessKey = AWS_SECRET_KEY

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
        ACL: 'public-read'
    }

    return s3.upload(uploadParams).promise()
}
exports.uploadFile = uploadFile

