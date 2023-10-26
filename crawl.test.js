const  {  normalizeURL } = require('./crawl');
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