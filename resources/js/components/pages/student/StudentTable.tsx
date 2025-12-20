import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Student } from '@/types';

interface StudentTableProps {
    studentsList: Student[];
    openForm: (student: Student) => void;
    handleDelete: (id: number) => void;
    processing: boolean;
}

const StudentTable = ({
    studentsList,
    openForm,
    handleDelete,
    processing,
}: StudentTableProps) => {
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
                {/* {studentsList.length > 0 ? (
                    studentsList.map((student: Student) => {
                        return (
                            <TableRow key={student.id}>
                                <TableCell>{student.id}</TableCell>
                                <TableCell>{student.first_name}</TableCell>
                                <TableCell>{student.last_name}</TableCell>
                                <TableCell>{student.grade}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button
                                        disabled={processing}
                                        onClick={() => openForm(student)}
                                        className="bg-orange-400 text-white hover:bg-orange-700"
                                    >
                                        <Pencil />
                                    </Button>
                                    <Button
                                        disabled={processing}
                                        onClick={() => handleDelete(student.id)}
                                        className="bg-red-500 text-white hover:bg-red-700"
                                    >
                                        <Trash2 />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            No Students Found!
                        </TableCell>
                    </TableRow>
                )} */}
            </TableBody>
        </Table>
    );
};

export default StudentTable;
