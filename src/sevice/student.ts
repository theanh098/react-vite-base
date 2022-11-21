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

export async function addStudent(student: Omit<Student, 'id'>) {
  return http.post('student', student);
}

export async function getStudent(id: number): Promise<Student> {
  return http.get(`student/${id}`);
}

export async function editStudent(
  id: number,
  student: Partial<Omit<Student, 'id'>>
) {
  return http.patch(`student/${id}`, student);
}

export async function deleteStudent(id: number) {
  return http.delete(`student/${id}`);
}
