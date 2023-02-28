import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
const moduleMocker = new ModuleMocker(global);
describe('ProductController', () => {
  let controller: ProductController;
  const productMockService={}
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers:[
        {
          provide:'ProductService',
          useValue:ProductService,
        }
      ]
    })
    .useMocker((token) => {      
      if (token === ProductService) {
       
        return productMockService;
      }
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
    .compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
