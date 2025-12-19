import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Teacher } from '@/types';
import { PageProps } from '@inertiajs/core';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teachers',
        href: '/teachers',
    },
];

interface TeacherPageProps extends PageProps {
    teachers?: Teacher[];
}

const emptyForm = { first_name: '', last_name: '', subject: '' };

const Teacher = () => {
    const { teachers } = usePage<TeacherPageProps>().props;
    const teacherList = teachers ?? [];

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        errors,
        processing,
        isDirty,
    } = useForm<Teacher>();
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenAdd = () => {
        setData(emptyForm);
        setOpen(true);
        setIsEdit(false);
    };

    const handleOpenEdit = (teacher: Teacher) => {
        setData({
            ...teacher,
        });
        setOpen(true);
        setIsEdit(true);
    };

    const handleClose = () => {
        setOpen(false);
        setData(emptyForm);
        setIsEdit(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof Teacher, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && data.id) {
            put(`/teachers/${data.id}`, {
                onSuccess: () => handleClose(),
            });
        } else {
            post('/teachers', {
                onSuccess: () => handleClose(),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            destroy(`/teachers/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Teachers" />
            <Card className="mt-6 p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Teachers</h1>
                    <Button onClick={handleOpenAdd}>Add Teacher</Button>
                </div>
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
                            teacherList.map((teacher) => {
                                return (
                                    <TableRow key={teacher.id}>
                                        <TableCell>{teacher.id}</TableCell>
                                        <TableCell>
                                            {teacher.first_name}
                                        </TableCell>
                                        <TableCell>
                                            {teacher.last_name}
                                        </TableCell>
                                        <TableCell>{teacher.subject}</TableCell>
                                        <TableCell className="flex gap-2">
                                            <Button
                                                disabled={processing}
                                                onClick={() =>
                                                    handleOpenEdit(teacher)
                                                }
                                                className="bg-orange-400 text-white hover:bg-orange-700"
                                            >
                                                <Pencil />
                                            </Button>
                                            <Button
                                                disabled={processing}
                                                onClick={() =>
                                                    handleDelete(teacher.id)
                                                }
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
            </Card>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        {/* TODO: Check if edit fits */}
                        <DialogTitle>Teacher Form</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col gap-6">
                            <div>
                                <Label htmlFor="first_name">First Name</Label>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    placeholder="First Name"
                                    value={data.first_name}
                                    onChange={(e) => handleChange(e)}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="last_name">Last Name</Label>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={data.last_name}
                                    onChange={(e) => handleChange(e)}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder="Subject"
                                    value={data.subject}
                                    onChange={(e) => handleChange(e)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            {/* TODO: Check if isEdit works */}
                            <Button type="submit" variant="outline">
                                Submit
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
};

export default Teacher;
