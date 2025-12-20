import { Button } from '@/components/ui/button';
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Teacher } from '@/types';
import { emptyForm } from '../../../pages/teacher/index';

type TeacherFormProps = {
    setOpen: (value: boolean) => void;
    setData: (key: keyof Teacher | Partial<Teacher>, value?: string) => void;
    put: (url: string, options: { onSuccess: () => void }) => void;
    post: (url: string, options: { onSuccess: () => void }) => void;
    data: Teacher;
};

const TeacherForm = ({
    setOpen,
    setData,
    put,
    post,
    data,
}: TeacherFormProps) => {
    const handleClose = () => {
        setOpen(false);
        setData(emptyForm);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(name as keyof Teacher, value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.id) {
            put(`/teachers/${data.id}`, {
                onSuccess: () => handleClose(),
            });
        } else {
            post('/teachers', {
                onSuccess: () => handleClose(),
            });
        }
    };
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {data.id ? 'Edit' : 'Add'} Teacher Form
                </DialogTitle>
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
                    <Button type="submit" variant="outline">
                        {data.id ? 'Edit' : 'Add'}
                    </Button>
                </div>
            </form>
        </DialogContent>
    );
};

export default TeacherForm;
