import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox-next";
import {PaletteTree} from "./palette";
import TaskCard from "@/app/components/TaskCard";
import {TaskFactory} from "@/app/components/TaskFactory";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/TaskCard">
                <TaskCard task={} statusIds={}/>
            </ComponentPreview>
            <ComponentPreview path="/TaskFactory">
                <TaskFactory/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;