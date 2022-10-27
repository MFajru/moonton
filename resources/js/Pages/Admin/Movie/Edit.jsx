import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Checkbox from "@/Components/Checkbox";
import Button from "@/Components/Button";
import ValidationErrors from "@/Components/ValidationErrors";
import Authenticated from "@/Layouts/Authenticated/Index";
import { Head, useForm } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

export default function Create({ auth, movie }) {
    const { data, setData, processing, errors } = useForm({
        ...movie,
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "file"
                ? event.target.files[0]
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        if (data.thumbnail === movie.thumbnail) {
            delete data.thumbnail;
        }
        Inertia.post(route("admin.dashboard.movie.update", movie.id), {
            _method: "PUT",
            ...data,
        });
    };

    return (
        <Authenticated auth={auth}>
            <Head title="Admin - Update Movie" />
            <h1 className="text-xl"> Update Movie: {movie.name}</h1>
            <hr className="mb-4" />
            <ValidationErrors errors={errors} />
            <form onSubmit={submit}>
                <Label forInput="name" value="Name" />
                <Input
                    type="text"
                    name="name"
                    defaultValue={movie.name}
                    variant="primary-outline"
                    handleChange={onHandleChange}
                    placeholder="Enter Movie Name"
                    isError={errors.name}
                />
                <Label forInput="category" value="Category" className="mt-4" />
                <Input
                    type="text"
                    name="category"
                    defaultValue={movie.category}
                    variant="primary-outline"
                    handleChange={onHandleChange}
                    placeholder="Enter Movie Category"
                    isError={errors.category}
                />
                <Label
                    forInput="video_url"
                    value="Video URL"
                    className="mt-4"
                />
                <Input
                    type="url"
                    name="video_url"
                    defaultValue={movie.video_url}
                    variant="primary-outline"
                    handleChange={onHandleChange}
                    placeholder="Enter Movie Video URL"
                    isError={errors.video_url}
                />
                <Label
                    forInput="thumbnail"
                    value="Thumbnail"
                    className="mt-4"
                />
                <img src={`/storage/${movie.thumbnail}`} className="w-40" />
                <Input
                    type="file"
                    name="thumbnail"
                    variant="primary-outline"
                    handleChange={onHandleChange}
                    placeholder="Enter Movie Thumbnail"
                    isError={errors.thumbnail}
                />
                <Label forInput="rating" value="Rating" className="mt-4" />
                <Input
                    type="number"
                    step="any"
                    name="rating"
                    defaultValue={movie.rating}
                    variant="primary-outline"
                    handleChange={onHandleChange}
                    placeholder="Enter Movie Rating"
                    isError={errors.rating}
                />
                <div className="flex flex-row mt-4 items-center">
                    <Label
                        forInput="is_featured"
                        value="Is Featured"
                        className="mt-1 mr-3"
                    />
                    <Checkbox
                        name="is_featured"
                        handleChange={(e) =>
                            setData(e.target.name, e.target.checked)
                        }
                        checked={movie.is_featured}
                    />
                </div>
                <Button type="submit" className="mt-4" processing={processing}>
                    Save
                </Button>
            </form>
        </Authenticated>
    );
}
