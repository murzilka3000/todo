import Input from "./Input"

const input = {
    title: 'Input',
    component: Input
}

export default input

export const InputPrimary = (props: any) => {
    return <Input id="1" addTask={(title: string) => {alert(title)}}/>
}