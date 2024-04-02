import { Button } from "@/ui/components/ui/button"
import { Textarea } from "@/ui/components/ui/textarea"
import { useState } from "react"

export const Action = ({title, index}: {title: string, index: number}) => {

    const [isWriting, setIsWriting] = useState<boolean>(false)
    const submit = () => {
        setIsWriting(false)
        console.log(index, title)
    }

    return (
        <>
            {!isWriting && 
            <Button variant="ghost" onClick={() => setIsWriting(true)}>
                <i className="fa fa-add"></i>
                &nbsp;Add Card
            </Button>}
            {isWriting && (
                <div className="flex gap-5">
                    <Textarea className="resize-none bg-accent" placeholder="Write some task...">
                    </Textarea>
                    <Button onClick={submit}>Submit</Button>
                </div>
            )}
        </>
    )
}