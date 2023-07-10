import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { ImportQuestionService } from './import-question/import-question.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private importQuestionService: ImportQuestionService,
  ) {}

  create(createQuestionDto: CreateQuestionDto) {
    return this.questionRepository.save(createQuestionDto);
  }

  findAll() {
    return this.questionRepository.find({});
  }

  findOne(id: Question['id']) {
    return this.questionRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: Question['id'], updateQuestionDto: UpdateQuestionDto) {
    return this.questionRepository.update(
      {
        id,
      },
      updateQuestionDto,
    );
  }

  remove(id: Question['id']) {
    return this.questionRepository.delete({ id });
  }

  async import() {
    const questions = await this.importQuestionService.importQuestions();
    questions.forEach((question: Question) => {
      this.create(question);
    });
  }

  async getApiQuestionById(id: string) {
    return this.importQuestionService.getQuestionById(id);
  }
}
