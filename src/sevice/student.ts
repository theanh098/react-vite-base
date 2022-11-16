import { http } from './http';

type QueryGetList = {
  _limit: number;
  _page: number;
};

export type Student = {
  id: number;
  email: string;
  phone: string;
  region: string;
  address: string;
  name: string;
};

export type GetListStudentResponse = {
  list: Student[];
  count: number;
};

export async function getListStudents(
  query: QueryGetList
): Promise<GetListStudentResponse> {
  return http.get('student', { params: query });
}
