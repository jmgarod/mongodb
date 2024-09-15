require('fs').writeFileSync('/home/josemanuel/resultado_mongo.txt',db.personal.aggregate([
    {
      $project: { nombre: 1, minus: { $toLower: "$nombre" } }
    },
    {
      $project: {
        nombre: 1,
        result: {
          $cond: {
            if: { $eq: [{ $mod: [{ $size: {
                $setUnion: { $filter: {
                    input: { $map: {
                        input: { $range: [1, { $strLenCP: "$minus" },2] },
                        as: "ch",
                        in: {
                          $switch: {
                            branches: [
                              { case: { $eq: [{ $substrCP: ["$minus", "$$ch", 1] }, "á"] }, then: "a" },
                              { case: { $eq: [{ $substrCP: ["$minus", "$$ch", 1] }, "é"] }, then: "e" },
                              { case: { $eq: [{ $substrCP: ["$minus", "$$ch", 1] }, "í"] }, then: "i" },
                              { case: { $eq: [{ $substrCP: ["$minus", "$$ch", 1] }, "ó"] }, then: "o" },
                              { case: { $eq: [{ $substrCP: ["$minus", "$$ch", 1] }, "ú"] }, then: "u" }
                            ],
                            default: { $substrCP: ["$minus", "$$ch", 1] }
                          }
                        }
                      }
                    },
                    as: "char",
                    cond: { $in: ["$$char", ['a', 'e', 'i', 'o', 'u']] }
                  }}
            }
                }, 2] }, 0] },
            then: true,
            else: false
          }
        }
      }
    },
    { $match: { result: true } },
    { $project: { nombre: 1, _id: 0 } }
  ]).toArray().map(({nombre})=>nombre).join('\n'))







  