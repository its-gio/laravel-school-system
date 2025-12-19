import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Teacher } from '@/types';
import { Pencil, Trash2 } from 'lucide-react';

type TeacherTableProps = {
    teacherList: Teacher[];
    handleOpenEdit: (teacher: Teacher) => void;
    handleDelete: (id: number) => void;
    processing: boolean;
};

const TeacherTable = ({
    teacherList,
    handleOpenEdit,
    handleDelete,
    processing,
}: TeacherTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Fist Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="w-[100px]">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {teacherList.length > 0 &&
                    teacherList.map((teacher: Teacher) => {
                        return (
                            <TableRow key={teacher.id}>
                                <TableCell>{teacher.id}</TableCell>
                                <TableCell>{teacher.first_name}</TableCell>
                                <TableCell>{teacher.last_name}</TableCell>
                                <TableCell>{teacher.subject}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button
                                        disabled={processing}
                                        onClick={() => handleOpenEdit(teacher)}
                                        className="bg-orange-400 text-white hover:bg-orange-700"
                                    >
                                        <Pencil />
                                    </Button>
                                    <Button
                                        disabled={processing}
                                        onClick={() => handleDelete(teacher.id)}
                                        className="bg-red-500 text-white hover:bg-red-700"
                                    >
                                        <Trash2 />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
            </TableBody>
        </Table>
    );
};

export default TeacherTable;
