const  {  normalizeURL, getURLsFromHTML } = require('./crawl');
const { test, expect } = require('@jest/globals');

test('noramalizeURL protocols', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
});

test('noramalizeURL trailing slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
});

test('noramalizeURL capitals', () => {
    const input = 'https://Blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
});

test('noramalizeURL protocols http', () => {
    const input = 'http://Blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
        <html>
            <body>
            <a href='https://blog.boot.dev/'>
            Boot.dev Blog
            </a>
            </body>
        </html>
    `;

    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.boot.dev/'];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
        <html>
            <body>
            <a href='https://blog.boot.dev/path1'>
            Boot.dev Blog
            </a>
            <a href='/path2/'>
            Boot.dev Blog
            </a>
            </body>
        </html>
    `;

    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://blog.boot.dev/path1', 'https://blog.boot.dev/path2/'];
    expect(actual).toEqual(expected);
});

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
        <html>
            <body>
            <a href='invalid'>
            Boot.dev Blog
            </a>
            </body>
        </html>
    `;

    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
});