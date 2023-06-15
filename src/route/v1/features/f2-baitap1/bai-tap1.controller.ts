import { Types } from 'mongoose';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import ParseObjectIdPipe from '@pipe/parse-object-id.pipe';
import { ApiQueryParams } from '@decorator/api-query-params.decorator';
import AqpDto from '@interceptor/aqp/aqp.dto';
import { ApiTags } from '@nestjs/swagger';
import BaiTap1Service from './bai-tap1.service';

@ApiTags('BaiTap1s')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class BaiTap1Controller {
  constructor(
    private readonly baiTap1Service: BaiTap1Service,
  ) { }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 1: Liệt kê danh sách các lớp của khoa, thông tin cần Malop, TenLop, MaKhoa SELECT * FROM Lop
   * @param query
   * @returns
   */
  @Get('cau1')
  @HttpCode(200)
  async cau1(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau1(query);
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 2: Lập danh sách sinh viên gồm: MaSV, HoTen, HocBong SELECT MaSV, Hoten, HocBong FROM SinhVien
   * @param query
   * @returns
   */
  @Get('cau2')
  @HttpCode(200)
  async cau2(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau2(query);
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 3: Lập danh sách sinh viên có học bổng. Danh sách cần MaSV, Nu, HocBong
   * SELECT MaSV, Nu, HocBong FROM SinhVien WHERE HocBong>0
   * @param query
   * @returns
   */
  @Get('cau3')
  @HttpCode(200)
  async cau3(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau3(query);
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 4: Lập danh sách sinh viên nữ. Danh sách cần các thuộc tính của quan hệ sinhvien
   * SELECT * FROM SinhVien WHERE Nu =Yes
   * @param query
   * @returns
   */
  @Get('cau4')
  @HttpCode(200)
  async cau4(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau4(query);
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 5: Lập danh sách sinh viên có họ ‘Trần’
   * SELECT * FROM SinhVien WHERE HoTen Like ‘Trần *’
   * @param query
   * @returns
   */
  @Get('cau5')
  @HttpCode(200)
  async cau5(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau5(query);
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 6: Lập danh sách sinh viên nữ có học bổng
   * SELECT * FROM SinhVien WHERE Nu=Yes AND HocBong>0
   * @param query
   * @returns
   */
  @Get('cau6')
  @HttpCode(200)
  async cau6(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau6(query);
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 7: Lập danh sách sinh viên nữ hoặc danh sách sinh viên có học bổng
   * SELECT * FROM SinhVien WHERE Nu=Yes OR HocBong>0
   * @param query
   * @returns
   */
  @Get('cau7')
  @HttpCode(200)
  async cau7(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau7(query);
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 8: Lập danh sách sinh viên có năm sinh từ 1978 đến 1985. Danh sách cần các thuộc tính của quan hệ SinhVien
   * SELECT * FROM SinhVien WHERE YEAR(NgaySinh) BETWEEN 1978 AND 1985
   * @param query
   * @returns
   */
  @Get('cau8')
  @HttpCode(200)
  async cau8(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau8(query);
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 9: Liệt kê danh sách sinh viên được sắp xếp tăng dần theo MaSV
   * SELECT * FROM SinhVien ORDER BY MaSV
   * @param query
   * @returns
   */
  @Get('cau9')
  @HttpCode(200)
  async cau9(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau9(query);
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 10: Liệt kê danh sách sinh viên được sắp xếp giảm dần theo HocBong
   * SELECT * FROM SinhVien ORDER BY HocBong DESC
   * @param query
   * @returns
   */
  @Get('cau10')
  @HttpCode(200)
  async cau10(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau10(query);
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Ví du11: Lập danh sách sinh viên có điểm thi môn CSDL>=8
   * SELECT SinhVien.MaSV, HoTen, Nu, NgaySinh, DiemThi FROM SinhVien
   * INNER JOIN KetQua ON SinhVien.MaSV = KetQua.MaSV
   * WHERE MaMH = ‘CSDL’ AND DiemThi>=8
   * @param query
   * @returns
   */
  @Get('cau11')
  @HttpCode(200)
  async cau11(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau11();
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Ví du 12: Lập danh sách sinh viên có học bổng của khoa CNTT. Thông tin cần: MaSV, HoTen, HocBong,TenLop
   * SELECT MaSV, HoTen, HocBong, TenLop FROM Lop
   * INNER JOIN SinhVien ON Lop.MaLop=SinhVien.MaLop
   * WHERE HocBong>0 AND MaKhoa =’CNTT’
   * @param query
   * @returns
   */
  @Get('cau12')
  @HttpCode(200)
  async cau12(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau12();
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Ví du 13: Lập danh sách sinh viên có học bổng của khoa CNTT. Thông tin cần: MaSV, HoTen, HocBong,TenLop, TenKhoa
   * SELECT MaSV, HoTen, HocBong, TenLop,TenKhoa
   * FROM ((Lop INNER JOIN SinhVien ON Lop.MaLop=SinhVien.MaLop)
   * INNER JOIN Khoa ON Khoa.MaKhoa=Lop.MaKhoa) WHERE HocBong>0 AND Khoa.MaKhoa =’CNTT’
   * @param query
   * @returns
   */
  @Get('cau13')
  @HttpCode(200)
  async cau13(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau13();
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 14: Cho biết số sinh viên của mỗi lớp
   * SELECT Lop.MaLop, TenLop, Count(MaSV) as SLsinhvien FROM Lop
   * INNER JOIN SinhVien ON Lop.MaLop = SinhVien.MaLop
   * GROUP BY Lop.MaLop, TenLop
   * @param query
   * @returns
   */
  @Get('cau14')
  @HttpCode(200)
  async cau14(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau14();
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 15: Cho biết số lượng sinh viên của mỗi khoa.
   * SELECT Khoa.MaKhoa, TenKhoa, Count(MaSV) as SLsinhvien
   * FROM ((Khoa INNER JOIN Lop ON Khoa.MaKhoa = Lop.MaKhoa)
   * INNER JOIN SinhVien ON Lop.MaLop = SinhVien.MaLop)
   * GROUP BY Khoa.MaKhoa, TenKhoa
   * @param query
   * @returns
   */
  @Get('cau15')
  @HttpCode(200)
  async cau15(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau15();
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 16: Cho biết số lượng sinh viên nữ của mỗi khoa.
   * SELECT Khoa.MaKhoa, TenKhoa, Count(MaSV) as SLsinhvien
   * FROM ((SinhVien INNER JOIN Lop ON Lop.MaLop = SinhVien.MaLop)
   * INNER JOIN khoa ON KHOA.makhoa = Lop.makhoa) WHERE Nu=Yes GROUP BY Khoa.MaKhoa, TenKhoa
   * @param query
   * @returns
   */
  @Get('cau16')
  @HttpCode(200)
  async cau16(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau16();
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 17: Cho biết tổng tiền học bổng của mỗi lớp
   * SELECT Lop.MaLop, TenLop, Sum(HocBong) as TongHB
   * FROM (Lop INNER JOIN SinhVien ON Lop.MaLop = SinhVien.MaLop)
   * GROUP BY Lop.MaLop, TenLop
   * @param query
   * @returns
   */
  @Get('cau17')
  @HttpCode(200)
  async cau17(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau17();
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 18: Cho biết tổng số tiền học bổng của mỗi khoa
   * SELECT Khoa.MaKhoa, TenKhoa, Sum(HocBong) as TongHB
   * FROM ((Khoa INNER JOIN Lop ON Khoa.Makhoa = Lop.MaKhoa)
   * INNER JOIN SinhVien ON Lop.MaLop = SinhVien.MaLop) GROUP BY Khoa.MaKhoa, TenKhoa

   * @param query
   * @returns
   */
  @Get('cau18')
  @HttpCode(200)
  async cau18(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau18();
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 19: Lập danh sánh những khoa có nhiều hơn 100 sinh viên. Danh sách cần: MaKhoa, TenKhoa, Soluong
   * SELECT Khoa.MaKhoa, TenKhoa, Count(MaSV) as SLsinhvien
   * FROM ((Khoa INNER JOIN Lop ON Khoa.Makhoa = Lop.MaKhoa)
   * INNER JOIN SinhVien ON Lop.MaLop = SinhVien.MaLop) GROUP BY Khoa.MaKhoa, TenKhoa HAVING Count(MaSV) >100
   * @param query
   * @returns
   */
  @Get('cau19')
  @HttpCode(200)
  async cau19(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau19();
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 20: Lập danh sánh những khoa có nhiều hơn 50 sinh viên nữ. Danh sách cần: MaKhoa, TenKhoa, Soluong
   * SELECT Khoa.MaKhoa, TenKhoa, Count(MaSV) as SLsinhvien
   * FROM ((Khoa INNER JOIN Lop ON Khoa.Makhoa = Lop.MaKhoa)
   * INNER JOIN SinhVien ON Lop.MaLop = SinhVien.MaLop) WHERE Nu=Yes GROUP BY Khoa.MaKhoa, TenKhoa HAVING Count(MaSV)>=50
   * @param query
   * @returns
   */
  @Get('cau20')
  @HttpCode(200)
  async cau20(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau20();
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 21: Lập danh sách những khoa có tổng tiền học bổng >=1000000.
   * SELECT Khoa.MaKhoa, TenKhoa, Sum(HocBong) as TongHB
   * FROM ((Khoa INNER JOIN Lop ON Khoa.Makhoa = Lop.MaKhoa)
   * INNER JOIN SinhVien ON Lop.MaLop = SinhVien.MaLop) GROUP BY Khoa.MaKhoa, TenKhoa HAVING Sum(HocBong)>= 1000000
   * @param query
   * @returns
   */
  @Get('cau21')
  @HttpCode(200)
  async cau21(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau21();
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu22: Lập danh sách sinh viên có học bổng cao nhất
   * SELECT SinhVien.* FROM SinhVien WHERE HocBong>= ALL(SELECT HocBong From Sinhvien)
   * @param query
   * @returns
   */
  @Get('cau22')
  @HttpCode(200)
  async cau22(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau22();
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 23: Lập danh sách sinh viên có điểm thi môn CSDL cao nhất
   * SELECT SinhVien.MaSV, HoTen, DiemThi FROM SinhVien
   * INNER JOIN KetQua ON SinhVien.MaSV = KetQua.MaSV
   * WHERE KetQua.MaMH= ‘CSDL’ AND DiemThi>= ALL(SELECT DiemThi FROM KetQua WHERE MaMH = ‘CSDL’)
   * @param query
   * @returns
   */
  @Get('cau23')
  @HttpCode(200)
  async cau23(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau23();
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 24: Lập danh sách những sinh viên không có điểm thi môn CSDL.
   * SELECT SinhVien.MaSV, HoTen, DiemThi,MaMH FROM SinhVien
   * INNER JOIN KetQua ON SinhVien.MaSV = KetQua.MaSV
   * WHERE SinhVien.MaSV NOT In (Select MaSV From KetQua Where MaMH=’CSDL’)
   * @param query
   * @returns
   */
  @Get('cau24')
  @HttpCode(200)
  async cau24(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau24();
  }

  /**--------------------------------------------------------------------------------------------------------------
   * Câu 25: Cho biết những khoa nào có nhiều sinh viên nhất
   * SELECT Khoa.MaKhoa, TenKhoa, Count([MaSV]) AS SoLuongSV
   * FROM (Khoa INNER JOIN Lop ON Khoa.MaKhoa = Lop.MaKhoa)
   * INNER JOIN SinhVien ON Lop.MaLop = SinhVien.MaLop
   * GROUP BY Khoa.MaKhoa, Khoa.TenKhoa HaVing Count(MaSV)>=All(Select Count(MaSV)
   * From ((SinhVien Inner Join Lop On Lop.Malop=SinhVien.Malop)
   * Inner Join Khoa On Khoa.MaKhoa = Lop.MaKhoa )Group By Khoa.Makhoa)
   * @param query
   * @returns
   */
  @Get('cau25')
  @HttpCode(200)
  async cau25(@Query() query: any): Promise<any> {
    return this.baiTap1Service.cau25();
  }
}
