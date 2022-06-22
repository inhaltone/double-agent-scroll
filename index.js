export class DoubleAgentScroll {
    rootElement = '#double-agent';
    offsetTop = 100;
    navClass = '.double-agent-link';
    sectionClass = '.double-agent-section';
    url = new URL(window.location);
    navElements = Array();
    sectionElements = Array();
    activeIndex = 0;

    constructor(...args) {
        if (args.length === 1 && typeof args[0] === 'string') {
            this.rootElement = args[0];
        } else if (args.length === 2 && typeof args[0] === 'string' && typeof args[1] === 'object') {
            this.rootElement = args[0];
            Object.assign(this, args[1]);
        }
        this.navElements = this.getNavElements();
        this.sectionElements = this.getSectionElements();
        this.renderDoubleAgent();
        this.findHashOnURL();
        this.getActiveState();
    }

    findHashOnURL() {
        if (this.url.hash !== '') {
            const target = this.url.hash.replace(/#(\S)/g, '$1');
            const foundSection = this.setFoundSection(target);
            this.setScrollPosition(foundSection);
        }
    }

    renderDoubleAgent() {
        if (this.rootElement != null) {
            this.startScrollListener();
            this.startClickListener(this.navElements);
        } else {
            this.destroyScrollListener();
            this.destroyClickListener(this.navElements);
        }
    }

    getNavElements() {
        return Array.from(document.querySelectorAll(this.navClass));
    }

    getSectionElements() {
        return Array.from(document.querySelectorAll(this.sectionClass));
    }

    getActiveState() {
        const currentIndex = this.sectionElements.length - [...this.sectionElements].reverse().findIndex((section) => window.scrollY >= section.offsetTop - this.offsetTop) - 1;
        if (currentIndex !== this.activeIndex) {
            this.removeAllActive();
            this.activeIndex = currentIndex;
            this.setActiveClass(currentIndex);
        }
    }

    setFoundSection(target) {
        const foundSection = this.sectionElements.find((section) => section.id === target);
        if (foundSection !== undefined) {
            return foundSection;
        }
    }

    setHashOnURL(target) {
        const url = new URL(window.location);
        url.hash = target;
        window.history.pushState({}, '', url);
        return url;
    }

    setScrollPosition(section) {
        window.scrollTo({
            top: section.offsetTop - this.offsetTop,
            left: 0,
            behavior: 'smooth',
        });
    }

    setActiveClass(index) {
        this.navElements[index].classList.add('active');
    }

    removeActiveClass(index) {
        this.navElements[index].classList.remove('active');
    }

    removeAllActive() {
        [...Array(this.sectionElements.length).keys()].forEach((key) => this.removeActiveClass(key));
    }

    startClickListener(links) {
        links.forEach((link) => link.addEventListener('click', this.onClick.bind(this)));
    }

    destroyClickListener(links) {
        links.forEach((link) => link.removeEventListener('click', this.onClick.bind(this)));
    }

    startScrollListener() {
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    destroyScrollListener() {
        window.removeEventListener('scroll', this.onScroll.bind(this));
    }

    onClick(event) {
        event.preventDefault();
        const target = event.currentTarget.dataset.target;
        this.url = this.setHashOnURL(target);
        const foundSection = this.setFoundSection(target);
        this.setScrollPosition(foundSection);
    }

    onScroll() {
        this.getActiveState();
    }
}