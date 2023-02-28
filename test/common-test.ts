export const mockModel=(dto: any,mySelf)=> {
    mySelf.data = dto;
    mySelf.save  = () => {
      return mySelf.data;
    };
  }