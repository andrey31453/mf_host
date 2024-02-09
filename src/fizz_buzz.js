class Tag {
  constructor(v) {
    this.value = v
  }
}

class Printer {
  constructor(ctx) {
    this.context = ctx
  }

  log() {
    console.log(this.context.value)
  }
}

class Contidion {
  constructor(divider) {
    this.divider = divider
  }

  is_truthy(num) {
    return num % this.divider === 0
  }
}

class Strategy {
  constructor(conditions_or_strategies) {
    this.conditions = conditions_or_strategies
  }

  is_truthy(num) {
    for (let i in this.conditions) {
      if (!this.conditions[i].is_truthy(num)) return false
    }

    return true
  }
}

class Rule {
  constructor(tag, strategy) {
    this.tag = tag
    this.strategy = strategy
  }

  is_success(num) {
    return this.strategy.is_truthy(num)
  }
}

class Collection {
  constructor(tags) {
    this.tags = tags
  }

  find(num, default_value) {
    for (let i in this.tags) {
      if (this.tags[i].is_success(num)) {
        return this.tags[i].tag
      }
    }

    return default_value
  }
}

class Fizz_Buzz {
  constructor(max_num, collection) {
    this.max_num = max_num
    this.collection = collection
  }

  do() {
    for (let i = 1; i < this.max_num; i++) {
      new Printer(this.collection.find(i, new Tag(i))).log()
    }
  }
}

export const fizz_buzz = (max_num) => {
  const collection = new Collection([
    new Rule(
      new Tag('fizzbuzz'),
      new Strategy([new Contidion(3), new Contidion(5)])
    ),
    new Rule(new Tag('fizz'), new Strategy([new Contidion(3)])),
    new Rule(new Tag('buzz'), new Strategy([new Contidion(5)])),
  ])

  new Fizz_Buzz(max_num, collection).do()
}