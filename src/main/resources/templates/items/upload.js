function uploading(){
    const AWS = require('aws-sdk');
    const fs = require('fs');
    const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
    const region = 'kr-standard';
    const access_key = '1KGCGRBnJ7UTVzXVD8qv';
    const secret_key = 'IpCJb3Ldyzlsid6hWk3gULmTz6Kg4LA0R1GI4hkZ';

    const S3 = new AWS.S3({
        endpoint: endpoint,
        region: region,
        credentials: {
            accessKeyId : access_key,
            secretAccessKey: secret_key
        }
    });


    const bucket_name = 'together-image';
    const local_file_path = './image.jpg';



    (async () => {

        let object_name = 'image.jpg';
        // create folder
        await S3.putObject({
            Bucket: bucket_name,
            Key: object_name
        }).promise();

        object_name = 'image.jpg';

        // upload file
        await S3.putObject({
            Bucket: bucket_name,
            Key: object_name,
            ACL: 'public-read',
            // ACL을 지우면 전체공개가 되지 않습니다.
            Body: fs.createReadStream(local_file_path)
        }).promise();

    })();
}uploading();
