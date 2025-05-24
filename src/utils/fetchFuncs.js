export function getProjects(setData) {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            setData(data);
        });
}

export function getProject(id, setData) {
    fetch(`data.json`)
        .then(res => res.json())
        .then(data => {
            const project = data.projects.find(project => project.id === id);
            setData(project)
        });
}