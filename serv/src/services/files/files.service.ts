import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'

@Injectable()
export class FileService {
 async createFile(file):Promise<string> {
try{
  console.log(file)
   if(file === undefined) return null
   const format = file.originalname.split('.')[1]
  
   const fileName = uuid.v4() + `.${format}`;
   const filePath = path.resolve(__dirname, '../../../', 'static')
   if(!fs.existsSync(filePath)){
    fs.mkdirSync(filePath, {recursive: true})
   }
fs.writeFileSync(path.join(filePath, fileName), file.buffer)
  return fileName
}catch(e){
  console.log(e)
throw new HttpException('error happend when we try write file', HttpStatus.INTERNAL_SERVER_ERROR)
}
 }

}
