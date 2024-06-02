import * as Select from "@radix-ui/react-select";
import * as Form from "@radix-ui/react-form";
import {ChevronDownIcon, Theme} from "@radix-ui/themes";
import {CheckIcon, ChevronUpIcon} from "@radix-ui/react-icons";
import React, {useState} from "react";
import classnames from "classnames";


interface statusProps{
    id: number | null;
    statusIds: number[];
    onChange: (id: number) => void;
    onAddNewStatus: (status: string) => void;
}
const StatusDropdown = ({id, statusIds, onChange, onAddNewStatus}: statusProps) => {
    const [newStatus, setNewStatus] = useState("");

    const handleNewStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewStatus(e.target.value);
    }

    const handleNewStatusSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onAddNewStatus(newStatus);
        setNewStatus("");
    }
    const SelectStatus = () => (
        <Select.Root onValueChange={(value) => onChange(Number(value))}>
            <Select.Trigger
                className="inline-flex items-center justify-center rounded px-[5px] text-[13px] leading-none h-[25px]  bg-white text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9 outline-none"
                aria-label="Status"
            >
                <Select.Value placeholder={id ? String(id): "Select Status"}/>
                <Select.Icon className="text-violet-50">
                    <ChevronDownIcon />
                </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
                <Select.Content
                    className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                    <Select.ScrollUpButton
                        className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                        <ChevronUpIcon />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-[5px]">
                        <Select.Group>
                            <Form.Root>
                                <Form.Field className='inline-block items-baseline' name="status">
                                    <div>
                                        <Form.Message className="text-[13px] text-black opacity-[0.8]" match="typeMismatch">
                                            Please provide a valid email
                                        </Form.Message>
                                    </div>
                                    <Form.Control asChild>
                                        <input
                                            placeholder="New status"
                                            className=" box-border w-auto bg-blackA2 shadow-blackA6 h-[30px] appearance-none rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA6"
                                            type="status"
                                            required
                                        />
                                    </Form.Control>
                                </Form.Field>
                                <Form.Submit asChild>
                                    <button className="box-border w-auto text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[20px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]">
                                        Add
                                    </button>
                                </Form.Submit>
                            </Form.Root>
                        </Select.Group>
                        <Select.Group>
                            <Select.Label className="px-[25px] text-xs leading-3 text-mauve11">
                                Status
                            </Select.Label>
                            {statusIds.map(statusId => (
                                <SelectItem key={statusId} value={String(statusId)}>{statusId}</SelectItem>
                            ))}
                        </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton
                        className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                        <ChevronDownIcon />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );

    const SelectItem = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<typeof Select.Item>>(
        ({ children, className, ...props }, forwardedRef) => {
        return (
            <Select.Item
                className={classnames(
                    'text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1',
                    className
                )}
                {...props}
                ref={forwardedRef}
            >
                <Select.ItemText>{children}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                    <CheckIcon/>
                </Select.ItemIndicator>
            </Select.Item>
        );
    }
    );
    SelectItem.displayName = 'SelectItem';
    return <SelectStatus />;

}
    export default StatusDropdown;