enum FontWeight {
    Regular,
    Medium,
    Semibold,
    Bold
};

class Color {
    private red: number;
    private green: number;
    private blue: number;

    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    private formatNumber(n: number): string {
        return n.toString(16).padStart(2, '0')
    }

    getColor(): string {
        this.red %= 256;
        this.green %= 256;
        this.blue %= 256;

        let red = this.formatNumber(this.red);
        let green = this.formatNumber(this.green);
        let blue = this.formatNumber(this.blue);

        return `#${red}${green}${blue}`;
    }
}

Color.prototype.toString = function() {
    return this.getColor();
}

type Style = {
    fontWeight: FontWeight | null,
    fontSize: number | null,
    indent: number | null,
    italic: boolean | null,
    color: Color | null
};

type Section = {
    text: string,
    style: Style | undefined
};

type Content = {
    title: string,
    sections: Section[]
};


export type  { 
    FontWeight,
    Color,
    Style,
    Section,
    Content 
};
