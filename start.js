var os = require('os')

if (os.type() == 'Darwin') {
    var Service = require('node-mac').Service,
        svc = new Service({
            name: 'EncServer',
            description: 'The nodejs.org example web server.',
            script: require('path').join(__dirname, './EncServer/EncServer.js'),
            //template: '/workspace/node-linux/lib/templates/systemv/debian',
            env: {
                name: "NODE_ENV",
                value: "production"
            }
        });
} else if (os.type() == 'win32') {

    var Service = require('node-windows').Service,
        svc = new Service({
            name: 'EncServer',
            description: 'The nodejs.org example web server.',
            script: require('path').join(__dirname, './EncServer/EncServer.js'),
            //template: '/workspace/node-linux/lib/templates/systemv/debian',
            env: {
                name: "NODE_ENV",
                value: "production"
            }
        });

} else if (os.type() == 'linux') {

    var Service = require('node-linux').Service,
        svc = new Service({
            name: 'EncServer',
            description: 'The nodejs.org example web server.',
            script: require('path').join(__dirname, './EncServer/EncServer.js'),
            //template: '/workspace/node-linux/lib/templates/systemv/debian',
            env: {
                name: "NODE_ENV",
                value: "production"
            }
        });
}
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function() {
    console.log('\nInstallation Complete\n---------------------');
    console.log('Trying to start ' + svc.name + '.\n');
    svc.start();
});

// Just in case this file is run twice.
svc.on('alreadyinstalled', function() {
    if(svc.exists) {
        console.log('This service is already installed & running.');
    } else {
        console.log('Attempting to start it.');
        svc.start();
    }


});

// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on('start', function() {
    console.log(svc.name + ' Service Started!'); //\nVisit http://127.0.0.1:11149 to see it in action.\n');
});

// Install the script as a service.
svc.install();