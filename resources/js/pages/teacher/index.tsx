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

const emptyForm = { first_name: '', last_name: '', subject: '' };

const Teacher = () => {
    const { teachers } = usePage<TeacherPageProps>().props;
    const teacherList = teachers ?? [];

    const { data, setData, post, errors, processing, isDirty } = useForm();
    const [open, handleOpen] = useState(false);
    const [isEdit, handleIsEdit] = useState(false);

    const handleOpenAdd = () => {
        setData(emptyForm);
        handleOpen(true);
        handleIsEdit(false);
    };

    const handleOpenEdit = (teacher: Teacher) => {
        setData({
            ...teacher,
        });
        handleOpen(true);
        handleIsEdit(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Teachers" />
        </AppLayout>
    );
};

export default Teacher;
