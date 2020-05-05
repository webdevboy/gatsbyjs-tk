"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withoutLeadingSlash = (s) => (s.startsWith('/') ? s.substring(1) : s);
exports.withoutTrailingSlash = (s) => (s.endsWith('/') ? s.substring(0, s.length - 1) : s);
exports.withTrailingSlash = (s) => (s.endsWith('/') ? s : `${s}/`);
const oldRegions = [
    'ap-northeast-1',
    'ap-southeast-1',
    'ap-southeast-2',
    'eu-west-1',
    'sa-east-1',
    'us-east-1',
    'us-gov-west-1',
    'us-west-1',
    'us-west-2',
];
// Inspired by Terraform implementation:
// https://git.io/fjr2Q
exports.getS3WebsiteDomainUrl = (region) => {
    // New regions uses different syntax for website endpoints
    // http://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteEndpoints.html
    if (oldRegions.includes(region)) {
        return `s3-website-${region}.amazonaws.com`;
    }
    return `s3-website.${region}.amazonaws.com`;
};
//# sourceMappingURL=util.js.map