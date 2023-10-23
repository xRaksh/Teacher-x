console.log('Abhi')

// for dark mode
const setup = () => {
    const getTheme = () => {
        if (window.localStorage.getItem('dark')) {
            return JSON.parse(window.localStorage.getItem('dark'))
        }
        return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    const setTheme = (value) => {
        window.localStorage.setItem('dark', value)
    }

    return {
        loading: true,
        isDark: getTheme(),
        toggleTheme() {
            this.isDark = !this.isDark
            setTheme(this.isDark)
        },
    }
}

// for sidebar buttons

const dash = document.getElementById('dash')
const teach = document.getElementById('teach')
const tut = document.getElementById('tut')
const cont = document.getElementById('cont')

// for Main Contents 
const dashboard = document.getElementById('dashboard')
const teacher = document.getElementById('teacher')
const tution = document.getElementById('tution')
const contact = document.getElementById('contact')

dash.addEventListener('click', () => {
    if (dashboard.style.display = "none") {
        dashboard.style.display = "block";
    } if (teacher.style.display != "none") {
        teacher.style.display = "none";
    } if (tution.style.display != "none") {
        tution.style.display = "none";
    } if (contact.style.display != "none") {
        contact.style.display = "none";
    } 
});

teach.addEventListener('click', () => {
    if (dashboard.style.display != "none") {
        dashboard.style.display = "none";
    } if (teacher.style.display = "none") {
        teacher.style.display = "block";
    } if (tution.style.display != "none") {
        tution.style.display = "none";
    } if (contact.style.display != "none") {
        contact.style.display = "none";
    } 
});

tut.addEventListener('click', () => {
    if (dashboard.style.display != "none") {
        dashboard.style.display = "none";
    } if (teacher.style.display != "none") {
        teacher.style.display = "none";
    } if (tution.style.display = "none") {
        tution.style.display = "block";
    } if (contact.style.display != "none") {
        contact.style.display = "none";
    } 
});

cont.addEventListener('click', () => {
    if (dashboard.style.display != "none") {
        dashboard.style.display = "none";
    } if (teacher.style.display != "none") {
        teacher.style.display = "none";
    } if (tution.style.display != "none") {
        tution.style.display = "none";
    } if (contact.style.display = "none") {
        contact.style.display = "block";
    } 
});