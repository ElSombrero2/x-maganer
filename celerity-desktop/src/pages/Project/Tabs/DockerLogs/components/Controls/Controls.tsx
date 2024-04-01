import { LegacyRef } from "react"
import { DockerServices } from "../../../../../../app/types/docker"
import { State } from "../../Provider"
import { Button } from "@/ui/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/ui/components/ui/select"

export interface IControls {
    form: LegacyRef<HTMLFormElement> | null,
    started: boolean,
    allowLogs: boolean,
    onStart: () => void,
    onStop: () => void,
    onClear: () => void,
    services: DockerServices[],
    label: string,
}

export const Controls = ({form, started, allowLogs, onStart, onStop, services, label, onClear}: IControls) => {

    const disabled = !allowLogs || label === State.Pending

    return (
        <form ref={form} onSubmit={e => e.preventDefault()}>
            <Button variant="outline" disabled={disabled} onClick={() => started ? onStop() : onStart()}>
                {label}
            </Button>
            <Button variant="destructive" disabled={disabled} onClick={onClear}>
                Clear
            </Button>
            <div className="w-[200px]">
                <Select disabled={disabled}>
                    <SelectTrigger>
                        Filter
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="*">*</SelectItem>
                        {services.map((e) => (
                            <SelectItem value={e.name}>
                                {e.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </form>
    )
}