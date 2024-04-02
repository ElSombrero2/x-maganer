import { Tab } from "../../shared/Tab/Tab";
import './Project.scss'
import { TabItem } from "../../shared/Tab/TabItem/TabItem";
import { useProject } from "./Provider";
import { Figma } from "./Tabs/Figma/Figma";
import { useState } from "react";
import { Documentation } from "./Tabs/Documentations/Documentation";
import { useParams } from "react-router-dom";
import { DockerLogs } from "./Tabs/DockerLogs/DockerLogs";
import { Services } from "./Tabs/Services/Services";
import moment from "moment";
import { Button } from "@/ui/components/ui/button";
import { ProjectBoard } from "./Tabs/ProjectBoard/ProjectBoard";

export const Project = () => {
    const { id } = useParams<{id: string}>()
    const { configuration, readme, project, onTaskMove, board } = useProject(id)
    const [current, setCurrent] = useState<string | undefined>()

    return (
        <div className="w-full py-5 px-5 gap-4 flex flex-col justify-end">
            <h3>Welcome <span className="text-destructive">{configuration?.user?.login},</span></h3>
            <div>
                <h1>{project?.name}</h1>
                <p>
                    {moment(project?.created_at).format('DD MMM YYYY HH:mm ')}
                    from
                    <span className="text-destructive">{` ${project?.based_template} `}</span>
                    template
                </p>
            </div>
            <Tab className="tab h-full"
                current={current}
                onItemClick={(title) => setCurrent(title)}
            >
                <TabItem className="h-full" title="Board">
                    <ProjectBoard board={board} onTaskMove={onTaskMove} />
                </TabItem>
                <TabItem className="h-full" title="Graphics">
                    <div className="flex flex-col items-center justify-center w-full h-full gap-8">
                        <p className="text-center text-muted-foreground">
                            Connect with Figma to access to this section
                        </p>
                        <Button variant="outline">
                            <i className="fab fa-figma"></i>
                            &nbsp;
                            Login With Figma
                        </Button>
                    </div>
                </TabItem>
                <TabItem className="h-full" title="Figma">
                    <Figma />
                </TabItem>
                <TabItem className="h-full" title="Documentation">
                    <Documentation markdown={readme || ''} />
                </TabItem>
                <TabItem title="Services" className="h-full">
                    <Services project={id} />
                </TabItem>
                <TabItem title="Logs" className="h-full">
                    <DockerLogs project={id} />
                </TabItem>
            </Tab>
        </div>
    )
}