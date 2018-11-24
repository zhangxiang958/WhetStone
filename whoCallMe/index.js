function where() {
    console.log('Function', where.caller);
    console.log('Function Name', where.caller.name);
}

function main() {
    where();
}

function a () {
    function b () {
        where();
    }
    b();
}

main();
a();