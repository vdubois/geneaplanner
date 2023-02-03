import {APIGatewayProxyEvent} from "aws-lambda";

export const event = (body: any): APIGatewayProxyEvent => ({
    body: JSON.stringify(body),
    // @ts-ignore
    requestContext: {
        authorizer: {
            jwt: {
                // @ts-ignore
                claims: {
                    'https://geneaplanner/roles': 'GENEAPLANNER_USER',
                    'https://geneaplanner/email': 'vdubois@yopmail.com',
                    'https://geneaplanner/email_verified': true
                }
            }
        }
    },
    pathParameters: {
        identifiant: 'vdubois@yopmail.com'
    }
})

export const eventWithUnauthorizedUser = (body: any): APIGatewayProxyEvent => ({
    body: JSON.stringify(body),
    // @ts-ignore
    requestContext: {
        authorizer: {
            jwt: {
                // @ts-ignore
                claims: {
                    'https://geneaplanner/roles': '',
                    'https://geneaplanner/email': 'vdubois@yopmail.com',
                    'https://geneaplanner/email_verified': true
                }
            }
        }
    },
    pathParameters: {
        identifiant: 'vdubois@yopmail.com'
    }
})

export const eventAuthorizedFor = (body: any, authorizedFor: string): APIGatewayProxyEvent => ({
    body: JSON.stringify(body),
    // @ts-ignore
    requestContext: {
        authorizer: {
            jwt: {
                // @ts-ignore
                claims: {
                    'https://geneaplanner/roles': 'GENEAPLANNER_USER',
                    'https://geneaplanner/email': 'vdubois@yopmail.com',
                    'https://geneaplanner/email_verified': true
                }
            }
        }
    },
    pathParameters: {
        identifiant: authorizedFor
    }
})

export const eventWithUserWithoutEmail = (body: any): APIGatewayProxyEvent => ({
    body: JSON.stringify(body),
    // @ts-ignore
    requestContext: {
        authorizer: {
            jwt: {
                // @ts-ignore
                claims: {
                    'https://geneaplanner/roles': 'GENEAPLANNER_USER',
                    'https://geneaplanner/email_verified': true
                }
            }
        }
    },
    pathParameters: {
        identifiant: 'vdubois@yopmail.com'
    }
})

export const eventWithUnverifiedUser = (body: any): APIGatewayProxyEvent => ({
    body: JSON.stringify(body),
    // @ts-ignore
    requestContext: {
        authorizer: {
            jwt: {
                // @ts-ignore
                claims: {
                    'https://geneaplanner/roles': 'GENEAPLANNER_USER',
                    'https://geneaplanner/email': 'vdubois@yopmail.com'
                }
            }
        }
    },
    pathParameters: {
        identifiant: 'vdubois@yopmail.com'
    }
})
