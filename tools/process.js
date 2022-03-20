import icals from './icals.json';

const result = {};

const promos = icals.filter(i => i.type == "promo");
const classes = icals.filter(i => i.type == "class");
const groups = icals.filter(i => i.type == "group");

promos.forEach(promo => {
    const promoKey = promo.group.replace(' ', '_').toLowerCase();

    result[promoKey] = {
        ical: promo.ical,
        classes: []
    };
    console.log(`Processing promo ${promo.group}`);

    const promoClasses = classes.filter(c => c.group.includes(promo.group.slice(-2)));

    promoClasses.forEach(_class => {
        console.log(`Processing class ${_class.group}`);

        const classGroups = groups.filter(g => g.group.includes(_class.group));

        result[promoKey].classes.push({
            className: _class.group.toLowerCase(),
            classIcal: _class.ical,
            groups: {
                prime: classGroups[0].ical,
                seconde: classGroups[1].ical,
            }
        })
    })
})

console.log(JSON.stringify(result, null, 2));
