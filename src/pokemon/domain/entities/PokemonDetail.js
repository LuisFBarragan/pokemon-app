export class PokemonDetail {
  constructor(id, name, sprite, types, stats, height) {
    this.id = id;
    this.name = name;
    this.sprite = sprite;
    this.types = types;
    this.stats = stats.map(stat => ({
      name: stat.stat.name,
      baseStat: stat.base_stat,
    }));
    this.height = height;
  }
}