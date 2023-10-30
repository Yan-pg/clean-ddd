import { Slug } from './slug'

test('it should ne able to create a new a slug from text', () => {
  const slug = Slug.createFromText('Example question title')

  expect(slug.value).toEqual('example-question-title')
})
