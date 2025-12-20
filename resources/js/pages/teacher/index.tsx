import TeacherForm from '@/components/pages/teacher/TeacherForm';
import TeacherTable from '@/components/pages/teacher/TeacherTable';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Teacher } from '@/types';
import { PageProps } from '@inertiajs/core';
import { Head, useForm, usePage } from '@inertiajs/react';
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

export const emptyForm = { first_name: '', last_name: '', subject: '' };

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
    } = useForm<Teacher>();
    const [open, setOpen] = useState(false);

    const handleOpenAdd = () => {
        setData(emptyForm);
        setOpen(true);
    };

    const handleOpenEdit = (teacher: Teacher) => {
        setData({
            ...teacher,
        });
        setOpen(true);
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
                <TeacherTable
                    teacherList={teacherList}
                    handleOpenEdit={handleOpenEdit}
                    handleDelete={handleDelete}
                    processing={processing}
                />
            </Card>
            <Dialog open={open} onOpenChange={setOpen}>
                <TeacherForm
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

export default Teacher;
