/**
 * Resources class is a map of resources
 * It keeps track of newly-added resources
 * It allows queries to be made to convert between resource quantities
 */
class Resources {
  constructor() {
    this.resources = [];
    this.resourceMap = {};
  }

  /**
   * getResourcesList returns an array of unique resource names
   * @returns {Array}
   */
  getResourcesList() {
    return this.resources;
  }

  /**
   * AddResource initializes new resources name and skips existing names
   * @param resource
   */
  addResource(resource) {
    const resourceLower = resource.toLowerCase();
    if(this.resources.indexOf(resourceLower) === -1) {
      this.resources.push(resourceLower);
      this.resourceMap[resourceLower] = {
        label: resource, // Label stored for display when querying for transitive closures
        relations: {}
      };
      this.resourceMap[resourceLower].relations[resourceLower] = 1; // Id relation
    }
  }

  /**
   * AddResourceRelation adds a direct relation from one resource to another
   * A two-way relation is added
   * @param fromAmount
   * @param fromResource
   * @param toAmount
   * @param toResource
   */
  addResourceRelation(fromAmount, fromResource, toAmount, toResource) {
    fromResource = fromResource.toLowerCase();
    toResource = toResource.toLowerCase();
    this.resourceMap[fromResource].relations[toResource] = toAmount / fromAmount;
    this.resourceMap[toResource].relations[fromResource] = fromAmount / toAmount;
  }

  /**
   * queryRelation calculates the amount of another resource
   * //TODO: Implement conversion by transitive closure
   * @param fromAmount
   * @param fromResource
   * @param toResource
   * @returns [{label:string, amount:number}]
   */
  queryRelation(fromAmount, fromResource, toResource) {
    const conversions = [];
    conversions.push({resource: fromResource, amount: fromAmount});
    const fromResourceLower = fromResource.toLowerCase();
    const toResourceLower = toResource.toLowerCase();

    if(typeof(this.resourceMap[fromResourceLower].relations[toResourceLower]) === 'undefined') {
      return null
    } else {
      const toAmount = fromAmount * this.resourceMap[fromResourceLower].relations[toResourceLower];
      conversions.push({resource: toResource, amount: toAmount});
      return conversions;
    }
  }
}

export default Resources;