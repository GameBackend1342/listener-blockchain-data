import { callbackLambda } from '.';

(async () => {
    await callbackLambda(
        {
            Records: [
                {
                    messageId: '0d04b52d-ce1e-415b-953e-bba4e1b91bbe',
                    receiptHandle:
                        'AQEBz6Q/jYcIuc64W6gNC9ijWlUuBJhl7uCeqMW/JNTk7WsxNjy7XMWnVwfDHt7+nYV9+PR0kK9SZHFDvRdCwJGoRpe4hmKzbiBQZOp7PqYWs/OFFfXIqm02hnA5NA08/0KRY6gSVpsX4ZYTjccAR6Ab/tqnnCZgSLrCDpgwGIUIc0oisGqyLpajIEzr3WZD2avR6acJrJaz6CIU8CWSUdPsQcDxMBODy45j452938vZD8G6zutwU/tjuh82w7anKAOFKSlRI5FWXPOxNbMielghTGoUoUnlFwGHbnH4dqTqt9U=',
                    body: '{"nftType":"spaceship","wallet":"0xb98f4085b093b0fEc82D51897bbcB2528f26BaBC","tokenId":"453","_network":"matic-mumbai"}',
                    attributes: {
                        ApproximateReceiveCount: '1',
                        AWSTraceHeader: 'Root=1-644da0c6-2bd31cf9137dc18247f41ced',
                        SentTimestamp: '1682809030262',
                        SequenceNumber: '18877543185456624128',
                        MessageGroupId: '1406',
                        SenderId: 'AROA6D2R3VTCUJRBAKSLJ:BackplaneAssumeRoleSession',
                        MessageDeduplicationId: '5482',
                        ApproximateFirstReceiveTimestamp: '1682809030262',
                    },
                    messageAttributes: {},
                    md5OfBody: '902f4d97f7a8dcbe4ccaff5c021b4dfb',
                    eventSource: 'aws:sqs',
                    eventSourceARN: 'arn:aws:sqs:us-east-1:970297420997:beta-InputStepFunctionBeta.fifo',
                    awsRegion: 'us-east-1',
                },
            ],
        },
        {},
    );
})();
