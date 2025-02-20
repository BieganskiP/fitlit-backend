import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CreateCompanyDto } from '../dto/company/create-company.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    owner: User,
  ): Promise<Company> {
    const company = this.companyRepository.create({
      ...createCompanyDto,
      owner,
      ownerId: owner.id,
    });

    return this.companyRepository.save(company);
  }
}
