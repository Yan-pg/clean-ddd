import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/makes-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to edit a question ', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryQuestionRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toValue(),
      authorId: 'author-1',
      title: 'Pergunta test',
      content: 'Conteúdo test',
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'Pergunta test',
      content: 'Conteúdo test',
    })
  })

  it('should be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryQuestionRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionId: newQuestion.id.toValue(),
        authorId: 'author-2',
        title: 'Pergunta test',
        content: 'Conteúdo test',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
