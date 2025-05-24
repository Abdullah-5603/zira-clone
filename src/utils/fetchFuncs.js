export async function getProjects(setData) {
   await fetch('public/data.json')
        .then(res => res.json())
        .then(setData);
}

export function getProject(id, setData) {
  fetch(`public/data.json`)
        .then(res => res.json())
        .then(data => {
            const project =data.projects.find(project => project.id === id);
            console.log({project});
             setData(project)
        });
}