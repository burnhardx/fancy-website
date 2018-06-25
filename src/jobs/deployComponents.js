const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const template = _.template(fs.readFileSync(path.resolve(__dirname, 'componentTemplate.html')).toString());

class DeployableComponent {
    constructor(dir) {
        this.dir = dir;
        this.name = path.basename(dir);

        const files = fs.readdirSync(dir);

        const readFile = file => fs.readFileSync(path.resolve(dir, file)).toString()
        this.styles = files
            .filter(file => file.indexOf('.css') != -1)
            .map(readFile);

        this.markups = files
            .filter(file => file.indexOf('.html') != -1)
            .map(file => {
                return {
                    id: file.replace('.html', ''),
                    html: readFile(file)
                }
            });

        this.script = files
            .filter(file => file.indexOf('.js') != -1)
            .map(readFile)
            .map(script => {
                    return script.split('\n')
                        .filter(line=>line.indexOf('require(')==-1)
                        .filter(line=>line.indexOf('module.exports'))
                        .join('\n')
                }
            ).join('\n');
    }

    deploy() {
        const targetDirectory = path.resolve(__dirname, '../../public/components', this.name)
        if (!fs.existsSync(targetDirectory)){
            fs.mkdirSync(targetDirectory);
        }
        fs.writeFileSync(path.resolve(targetDirectory,'index.html'), template(this));
    }
}


const pathToComponents = path.resolve(__dirname, '../components');
fs.readdirSync(pathToComponents)
    .filter(file => fs.lstatSync(path.resolve(pathToComponents, file)).isDirectory())
    .map(dir => new DeployableComponent(path.resolve(pathToComponents, dir)))
    .forEach(component => component.deploy());