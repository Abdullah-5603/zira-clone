export function getProjects(setData) {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            console.log({data});
            setData(data);
        });
}

export function getProject(id, setData) {
    fetch(`data.json`)
        .then(res => res.json())
        .then(data => {
            const project = data.projects.find(project => project.id === id);
            console.log({ project });
            setData(project)
        });
}