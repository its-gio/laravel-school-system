import StudentForm from '@/components/pages/student/StudentForm';
import StudentTable from '@/components/pages/student/StudentTable';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, type Student } from '@/types';
import { PageProps } from '@inertiajs/core';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
];

interface StudentPageProps extends PageProps {
    students?: Student[];
}

export const emptyForm = { first_name: '', last_name: '', grade: null };

const Student = () => {
    const { students } = usePage<StudentPageProps>().props;
    const studentsList = students ?? [];

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        errors,
        processing,
    } = useForm<Student>();
    const [open, setOpen] = useState(false);

    const openForm = (student?: Student) => {
        student?.id ? setData(student) : setData(emptyForm);
        setOpen(true);
    };

    const handleDelete = (id: number) => {
        if (
            window.confirm(
                `Are you sure you want to delete student: ${data.first_name} ${data.last_name}?`,
            )
        ) {
            destroy(`/students/${id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Students" />
            <Card className="mt-6 p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Students</h1>
                    <Button onClick={() => openForm()}>Add Student</Button>
                </div>
                <StudentTable
                    studentsList={studentsList}
                    openForm={openForm}
                    handleDelete={handleDelete}
                    processing={processing}
                />
            </Card>
            <Dialog open={open} onOpenChange={setOpen}>
                <StudentForm
                    setOpen={setOpen}
                    setData={setData}
                    put={put}
                    post={post}
                    data={data}
                />
            </Dialog>
        </AppLayout>
    );
};

export default Student;
