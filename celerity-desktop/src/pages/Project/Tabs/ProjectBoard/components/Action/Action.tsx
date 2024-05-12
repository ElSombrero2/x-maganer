import { Button } from "@/ui/components/ui/button"
import { Textarea } from "@/ui/components/ui/textarea"
import { useRef, useState } from "react"

export const Action = ({title}: {title: string, index: number}) => {
    const [isWriting, setIsWriting] = useState<boolean>(false)
    const text = useRef<HTMLTextAreaElement>(null)
    const submit = () => {
        setIsWriting(false)
        const textarea = text.current
        if(textarea){
            const obj = {
                board: title,
                title: textarea.nodeValue
            }
        }
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
                    <Textarea ref={text} className="resize-none bg-accent" placeholder="Write some task...">
                    </Textarea>
                    <Button onClick={submit}>Submit</Button>
                </div>
            )}
        </>
    )
}