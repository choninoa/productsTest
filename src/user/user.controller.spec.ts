import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { LoginDTO } from './dtos/login.dto';
const moduleMocker = new ModuleMocker(global);
describe('UserController', () => {
  let controller: UserController;
  let userService:UserService;
  const userMockService={
    login:jest.fn((x:LoginDTO)=>{
      if(x.email=='admin@admin.com')
      return {
        status:'OK'
      }
      else return {
        status:false
      }
    })
  } 
  const statusMocked={
    json:jest.fn(x=>x)
  }
  const res={
    status:jest.fn(x=>statusMocked),
    json:statusMocked.json
  } as unknown as Response ;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[
        {
          provide:'UserService',
          useValue:UserService,
        }
      ]
    })
    .useMocker((token) => {      
      if (token === UserService) {
       
        return userMockService;
      }
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
    .compile();

    controller = module.get<UserController>(UserController);
    userService= module.get<UserService>(UserService);
  });

  it('User Controller should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('User Service should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('login should  false',async () => {
    const dto:LoginDTO = {
      "email": "pepe@gmail.com",
      "password": "12345678"
    };

   
   const login=await controller.login(res,dto)
   expect(login).toEqual({
    status:false
   });
  })

  it('login should  be succefully',async () => {
    const dto:LoginDTO = {
      "email": "admin@admin.com",
      "password": "12345678"
    };

    
   const login=await controller.login(res,dto)
   expect(login).toEqual({
    status:'OK'
   });
  })
});
